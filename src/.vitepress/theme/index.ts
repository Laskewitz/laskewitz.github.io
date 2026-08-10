import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

import './style.css'

import HomePage from './components/HomePage.vue'
import AboutPage from './components/AboutPage.vue'
import EventsPage from './components/EventsPage.vue'
import YearTile from './components/YearTile.vue'
import BlogPage from './components/BlogPage.vue'
import BlogPostRow from './components/BlogPostRow.vue'
import TalksPage from './components/TalksPage.vue'
import BlogPostHeader from './components/BlogPostHeader.vue'
import BlogFigure from './components/BlogFigure.vue'
import BlogPostFooter from './components/BlogPostFooter.vue'
import RedirectNotice from './components/RedirectNotice.vue'
import ResourcePage from './components/ResourcePage.vue'
import LinkRow from './components/LinkRow.vue'
import SpeakerCard from './components/SpeakerCard.vue'
import TalkPage from './components/TalkPage.vue'
import SiteLayout from './components/SiteLayout.vue'

export default {
  extends: DefaultTheme,
  Layout: SiteLayout,
  enhanceApp({ app }) {
    app.component('HomePage', HomePage)
    app.component('AboutPage', AboutPage)
    app.component('EventsPage', EventsPage)
    app.component('YearTile', YearTile)
    app.component('BlogPage', BlogPage)
    app.component('BlogPostRow', BlogPostRow)
    app.component('TalksPage', TalksPage)
    app.component('BlogPostHeader', BlogPostHeader)
    app.component('BlogFigure', BlogFigure)
    app.component('BlogPostFooter', BlogPostFooter)
    app.component('RedirectNotice', RedirectNotice)
    app.component('ResourcePage', ResourcePage)
    app.component('LinkRow', LinkRow)
    app.component('SpeakerCard', SpeakerCard)
    app.component('TalkPage', TalkPage)
  }
} satisfies Theme
