import { Notice, Plugin } from 'obsidian'
import NotionSyncSettingsTab from './NotionSyncSettingsTab'
import { DateTime } from 'luxon'
import invariant from 'tiny-invariant'
import { NotionClient } from './services/NotionClient'
import { PropertyMapper } from './services/PropertyMapper'
import { FileManager } from './services/FileManager'
import { SyncService } from './services/SyncService'
import { ErrorService } from './services/ErrorService'

const DEFAULT_SETTINGS: NotionSyncSettings = {
  files: {},
  apiKey: '',
  lastSync: 0,
  lastConflicts: [],
}

export default class NotionSync extends Plugin {
  settings: NotionSyncSettings
  notionClient: NotionClient
  propertyMapper: PropertyMapper
  fileManager: FileManager
  syncService: SyncService

  async onload() {
    await this.loadSettings()
    // called from obsidianApi etc.
    this.setSetting = this.setSetting.bind(this)

    // Initialize error service
    const errorService = new ErrorService()

    // Initialize services
    this.notionClient = new NotionClient(this.settings.apiKey, errorService)
    this.propertyMapper = new PropertyMapper(this.notionClient)
    this.fileManager = new FileManager(this.app, this.propertyMapper, errorService)
    this.syncService = new SyncService(
      this.app,
      this.notionClient,
      this.propertyMapper,
      this.fileManager,
      this.settings,
      this.setSetting
    )

    // Load databases
    await this.notionClient.loadDatabases()

    this.addSettingTab(new NotionSyncSettingsTab(this))

    this.addCommand({
      name: 'Sync',
      callback: () => this.syncService.sync(),
      id: 'sync',
    })

    this.addCommand({
      name: 'Download all files',
      id: 'force-download',
      callback: async () => {
        await this.setSetting({ lastSync: 0 })
        await this.syncService.sync('download')
      },
    })

    this.addCommand({
      name: 'Download this file',
      id: 'force-download-file',
      editorCallback: async (_editor, ctx) => {
        if (!ctx.file) return
        await this.fileManager.updateFrontmatter(
          ctx.file,
          async (frontmatter) => {
            invariant(ctx.file)
            const id = frontmatter['Notion ID']
            if (!id) {
              new Notice('No Notion ID property.')
              return
            }
            const page = await this.notionClient.getPage(id, true)
            await this.syncService.downloadPage(page, ctx.file, ctx.file.path, true)
            new Notice('Notion sync: downloaded.')
          }
        )
      },
    })

    this.addCommand({
      name: 'Upload this file',
      id: 'force-upload-file',
      editorCallback: async (_editor, ctx) => {
        if (!ctx.file) return
        await this.fileManager.updateFrontmatter(
          ctx.file,
          async (frontmatter) => {
            invariant(ctx.file)
            const id = frontmatter['Notion ID']
            if (!id) {
              new Notice('No Notion ID property.')
              return
            }
            await this.syncService.uploadFile(ctx.file, id, true)
            new Notice('Notion sync: uploaded.')
          }
        )
      },
    })

    this.addCommand({
      name: 'Upload all files',
      id: 'force-upload',
      callback: async () => {
        await this.setSetting({ lastSync: 0 })
        await this.syncService.sync('upload')
      },
    })
  }

  async loadSettings() {
    this.settings = Object.assign(DEFAULT_SETTINGS, await this.loadData())
  }

  async setSetting(settings: Partial<NotionSyncSettings>) {
    for (let key of Object.keys(settings)) {
      this.settings[key] = settings[key]
    }
    await this.saveData(this.settings)
  }
}
