import { parseCSV } from './parsers/csvParser'
import { parsePRN } from './parsers/prnParser'
import { renderJSON } from './renderer/jsonRenderer'
import { renderHTML } from './renderer/htmlRenderer'

const inputFormat = process.argv[2]
const outputFormat = process.argv[3]

if (!['csv', 'prn'].includes(inputFormat)) {
    process.stderr.write('Invalid input format\n')
    process.exit(1)
}

if (!['json', 'html'].includes(outputFormat)) {
    process.stderr.write('Invalid output format\n')
    process.exit(1)
}

const readStdin = async () => {
        return new Promise<string>((resolve, reject) => {
            let data = ''
            process.stdin.setEncoding('utf-8')
            process.stdin.on('data', chunk => data += chunk)
            process.stdin.on('end', () => resolve(data))
            process.stdin.on('error', err => reject(err))
        })
    }

;(async () => {
    try {
        const input = await readStdin()
        if (!input.trim()) {
            process.stdout.write(outputFormat === 'json' ? '[]' : '<table></table>')
            return
        }

        const records = inputFormat === 'csv' ? parseCSV(input) : parsePRN(input)
        const output = outputFormat === 'json' ? renderJSON(records) : renderHTML(records)

        process.stdout.write(output)
    } catch {
        process.stderr.write('Failed to process input\n')
        process.exit(1)
    }
})()
