import type { Category, SVGLogo } from '../types/video-api.types'
import ScratchLogo from '@/lib/media/scratch_logo.svg'
import PythonLogo from '@/lib/media/python_logo.svg'
import HTML5Logo from '@/lib/media/html5_logo.svg'
import CSS3Logo from '@/lib/media/css3_logo.svg'
import MySqlLogo from '@/lib/media/mysql_logo.svg'

export const categories: Category[] = [
  {
    id: 1,
    name: 'Scratch',
    url: 'kKUZckLp6os',
    description:
      'Tanulj kódolni szórakoztató módon! Készíts interaktív történeteket, játékokat és animációkat a Scratch segítségével.',
    isCommercial: false,
    logo: ScratchLogo as SVGLogo,
  },
  {
    id: 2,
    name: 'Python',
    url: '',
    description:
      'Sajátítsd el a világ legnépszerűbb nyelvét! Készíts alkalmazásokat, elemezz adatokat, és automatizálj feladatokat a Python segítségével.',
    isCommercial: false,
    logo: PythonLogo as SVGLogo,
  },
  {
    id: 3,
    name: 'HTML+CSS',
    url: '',
    description: 'Tervezd meg a lenyűgöző weboldalakat! Ismerd meg a web alapjait az HTML és CSS segítségével.',
    isCommercial: false,
    logo: HTML5Logo as SVGLogo,
    logo2: CSS3Logo as SVGLogo,
  },
  {
    id: 4,
    name: 'MySQL',
    url: '',
    description:
      'Szabadítsd fel az adatbázisok erejét! Tanuld meg hatékonyan kezelni és lekérdezni az adatokat a MySQL segítségével.',
    isCommercial: false,
    logo: MySqlLogo as SVGLogo,
  },
] as const
