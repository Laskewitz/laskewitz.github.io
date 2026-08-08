import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

import './style.css'

import EntranceDirectory from './components/EntranceDirectory.vue'
import HallDirectory from './components/HallDirectory.vue'
import HallTile from './components/HallTile.vue'
import NoticeBoard from './components/NoticeBoard.vue'
import PlacardIndex from './components/PlacardIndex.vue'
import RedirectNotice from './components/RedirectNotice.vue'
import ResourceDoor from './components/ResourceDoor.vue'
import SignRow from './components/SignRow.vue'
import SpeakerPlate from './components/SpeakerPlate.vue'
import TalkPlacard from './components/TalkPlacard.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('EntranceDirectory', EntranceDirectory)
    app.component('HallDirectory', HallDirectory)
    app.component('HallTile', HallTile)
    app.component('NoticeBoard', NoticeBoard)
    app.component('PlacardIndex', PlacardIndex)
    app.component('RedirectNotice', RedirectNotice)
    app.component('ResourceDoor', ResourceDoor)
    app.component('SignRow', SignRow)
    app.component('SpeakerPlate', SpeakerPlate)
    app.component('TalkPlacard', TalkPlacard)
  }
} satisfies Theme
