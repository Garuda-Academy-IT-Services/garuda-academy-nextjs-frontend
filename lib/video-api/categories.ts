import type { Category } from '../types/video-api.types'

export const categories: Category[] = [
  {
    id: 1,
    name: 'Scratch',
    url: 'kKUZckLp6os',
    description:
      'Tanulj kódolni szórakoztató módon! Készíts interaktív történeteket, játékokat és animációkat a Scratch segítségével.',
    isCommercial: false,
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/f1/Scratchlogo.svg',
  },
  {
    id: 2,
    name: 'Python',
    url: '',
    description:
      'Sajátítsd el a világ legnépszerűbb nyelvét! Készíts alkalmazásokat, elemezz adatokat, és automatizálj feladatokat a Python segítségével.',
    isCommercial: false,
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/f8/Python_logo_and_wordmark.svg',
  },
  {
    id: 3,
    name: 'HTML + CSS',
    url: '',
    description: 'Tervezd meg a lenyűgöző weboldalakat! Ismerd meg a web alapjait az HTML és CSS segítségével.',
    isCommercial: false,
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg',
  },
  {
    id: 4,
    name: 'MySQL',
    url: '',
    description:
      'Szabadítsd fel az adatbázisok erejét! Tanuld meg hatékonyan kezelni és lekérdezni az adatokat a MySQL segítségével.',
    isCommercial: false,
    logoUrl: 'https://labs.mysql.com/common/logos/mysql-logo.svg',
  },
] as const
