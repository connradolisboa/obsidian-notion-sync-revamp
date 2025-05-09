import { useEffect } from 'react'
import { Setting, ToggleComponent } from 'obsidian'
import _ from 'lodash'
import { NotionClient } from '../services/NotionClient'
import { FileManager } from '../services/FileManager'
import { PropertyMapper } from '../services/PropertyMapper'

interface AppProps {
  notionClient: NotionClient;
  fileManager: FileManager;
  propertyMapper: PropertyMapper;
  settings: NotionSyncSettings;
  setSetting: (settings: Partial<NotionSyncSettings>) => Promise<void>;
}

export default function App({ notionClient, fileManager, propertyMapper, settings, setSetting }: AppProps) {
	const apiKey = settings.apiKey
	useEffect(() => {}, [apiKey])

	if (!apiKey)
		return (
			<div>
				<p>Please set an API key before adding files.</p>
				<h2>Steps:</h2>
				<ol>
					<li>
						Go to{' '}
						<a href="https://www.notion.so/my-integrations">
							the Notion integrations website
						</a>{' '}
						and click "Create New Integration."
					</li>
					<li>Name it "Notion Sync." The logo is not necessary.</li>
					<li>
						Copy the "Internal Integration Secret" and paste it into
						the "Api Key" setting above.
					</li>
				</ol>
			</div>
		)

	return (
		<div className="font-regular">
			{_.sortBy(Object.values(notionClient.getDatabases()), (database) =>
				propertyMapper.parseText(database.title)
			).map((database) => {
				const title = propertyMapper.parseText(database.title)

				return (
					<div className="mb-1 flex">
						<div className="w-1/2 flex-none">{title}</div>
						<input
							defaultValue={
								settings.files[database.id]?.path ??
								''
							}
							className="w-1/2"
							type="text"
							spellCheck="false"
							placeholder="no folder selected"
							onBlur={(ev) =>
								fileManager.updateFile(database.id, {
									path: ev.target.value,
								}, settings, setSetting)
							}
						></input>
					</div>
				)
			})}
		</div>
	)
}
