import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Language from '#models/language'
export default class extends BaseSeeder {
  async run() {
    await Language.firstOrCreate({
      displayName: 'JavaScript',
      color: '#f1e05a',
    })

    await Language.firstOrCreate({
      displayName: 'TypeScript',
      color: '#2b7489',
    })

    await Language.firstOrCreate({
      displayName: 'Python',
      color: '#3572A5',
    })

    await Language.firstOrCreate({
      displayName: 'Java',
      color: '#b07219',
    })

    await Language.firstOrCreate({
      displayName: 'C#',
      color: '#178600',
    })

    await Language.firstOrCreate({
      displayName: 'C++',
      color: '#f34b7d',
    })

    await Language.firstOrCreate({
      displayName: 'C',
      color: '#555555',
    })

    await Language.firstOrCreate({
      displayName: 'PHP',
      color: '#4F5D95',
    })

    await Language.firstOrCreate({
      displayName: 'Ruby',
      color: '#701516',
    })

    await Language.firstOrCreate({
      displayName: 'Go',
      color: '#375eab',
    })

    await Language.firstOrCreate({
      displayName: 'Rust',
      color: '#dea584',
    })

    await Language.firstOrCreate({
      displayName: 'Swift',
      color: '#ffac45',
    })

    await Language.firstOrCreate({
      displayName: 'Kotlin',
      color: '#a97bff',
    })

    await Language.firstOrCreate({
      displayName: 'Scala',
      color: '#c22d40',
    })

    await Language.firstOrCreate({
      displayName: 'R',
      color: '#198ce7',
    })

    await Language.firstOrCreate({
      displayName: 'Haskell',
      color: '#5e5086',
    })

    await Language.firstOrCreate({
      displayName: 'Erlang',
      color: '#b83998',
    })

    await Language.firstOrCreate({
      displayName: 'Elixir',
      color: '#6e4a7e',
    })

    await Language.firstOrCreate({
      displayName: 'Clojure',
      color: '#db5855',
    })

    await Language.firstOrCreate({
      displayName: 'Groovy',
      color: '#e691b8',
    })

    await Language.firstOrCreate({
      displayName: 'Dart',
      color: '#00B4AB',
    })

    await Language.firstOrCreate({
      displayName: 'YAML',
      color: '#ff4d00',
    })

    await Language.firstOrCreate({
      displayName: 'Shell',
      color: '#89e051',
    })

    await Language.firstOrCreate({
      displayName: 'HTML',
      color: '#e34c26',
    })

    await Language.firstOrCreate({
      displayName: 'CSS',
      color: '#563d7c',
    })

    await Language.firstOrCreate({
      displayName: 'Other',
      color: '#080000',
    })
  }
}
