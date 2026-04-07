import { spawn } from 'child_process'
import chalk from 'chalk'
import { consola } from 'consola'
import { projRoot } from '@rw-vue-framework/build-utils'

// 声明全局变量
declare const process: any

export const run = async (command: string, cwd: string = projRoot) =>
  new Promise<void>((resolve, reject) => {
    consola.info(`run: ${chalk.green(command)}`)
    const [cmd, ...args] = command.split(' ')
    const app = spawn(cmd, args, {
      cwd,
      stdio: 'inherit',
      shell: process.platform === 'win32',
    })

    const onProcessExit = () => app.kill('SIGHUP')

    app.on('close', (code) => {
      process.removeListener('exit', onProcessExit)

      if (code === 0) resolve()
      else
        reject(
          new Error(`Command failed. \n Command: ${command} \n Code: ${code}`)
        )
    })
    process.on('exit', onProcessExit)
  })

// 更健壮的命令解析函数
function parseCommand(command: string): [string, string[]] {
  const parts: string[] = []
  let current = ''
  let inQuotes = false
  let quoteChar = ''

  for (let i = 0; i < command.length; i++) {
    const char = command[i]

    if (char === '\\' && inQuotes && i + 1 < command.length) {
      // 转义字符
      current += command[++i]
    } else if ((char === '"' || char === "'") && !inQuotes) {
      // 开始引号
      inQuotes = true
      quoteChar = char
    } else if (char === quoteChar && inQuotes) {
      // 结束引号
      inQuotes = false
      quoteChar = ''
    } else if (char === ' ' && !inQuotes) {
      // 参数分隔符
      if (current) {
        parts.push(current)
        current = ''
      }
    } else {
      // 普通字符
      current += char
    }
  }

  if (current) {
    parts.push(current)
  }

  return [parts[0] || '', parts.slice(1)]
}
