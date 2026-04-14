import { inject } from '@vercel/analytics';
import { StrictMode, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import { HeroUIProvider } from "@heroui/react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import './index.css'
import Layout from './Layout.jsx'

inject();

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  });
}


const App = lazy(() => import('./App.jsx'))
const Features = lazy(() => import('./Features.jsx'))
const Reviews = lazy(() => import('./Reviews.jsx'))
const Support = lazy(() => import('./Support.jsx'))
const SupportCenter = lazy(() => import('./SupportCenter.jsx'))
const SupportCategory = lazy(() => import('./SupportCategory.jsx'))
const SupportArticle = lazy(() => import('./SupportArticle.jsx'))
const CommunityGuidelines = lazy(() => import('./CommunityGuidelines.jsx'))
const Careers = lazy(() => import('./Careers.jsx'))
const Press = lazy(() => import('./Press.jsx'))
const About = lazy(() => import('./About.jsx'))
const Privacy = lazy(() => import('./Privacy.jsx'))
const SystemStatus = lazy(() => import('./SystemStatus.jsx'))
const DeviceIntegration = lazy(() => import('./DeviceIntegration.jsx'))
const AiCoaching = lazy(() => import('./AiCoaching.jsx'))
const Analytics = lazy(() => import('./Analytics.jsx'))
const Rewards = lazy(() => import('./Rewards.jsx'))
const Challenges = lazy(() => import('./Challenges.jsx'))
const Terms = lazy(() => import('./Terms.jsx'))
const Leaderboard = lazy(() => import('./Leaderboard.jsx'))
const NotFound = lazy(() => import('./NotFound.jsx'))
const Blog = lazy(() => import('./Blog.jsx'))
const Changelog = lazy(() => import('./Changelog.jsx'))
const Heatmap = lazy(() => import('./Heatmap.jsx'))
const Partners = lazy(() => import('./Partners.jsx'))
const Shop = lazy(() => import('./Shop.jsx'))
const WaitlistPage = lazy(() => import('./pages/WaitlistPage.tsx'))

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HeroUIProvider>
      <main className="dark text-foreground bg-background">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<App />} />
              <Route path="features" element={<Features />} />
              <Route path="reviews" element={<Reviews />} />
              <Route path="support" element={<Support />} />
              <Route path="support-center" element={<SupportCenter />} />
              <Route path="support-center/category/:categoryId" element={<SupportCategory />} />
              <Route path="support-center/article/:articleSlug" element={<SupportArticle />} />
              <Route path="community-guidelines" element={<CommunityGuidelines />} />
              <Route path="careers" element={<Careers />} />
              <Route path="press" element={<Press />} />
              <Route path="about" element={<About />} />
              <Route path="privacy" element={<Privacy />} />
              <Route path="system-status" element={<SystemStatus />} />
              <Route path="device-integration" element={<DeviceIntegration />} />
              <Route path="ai-coaching" element={<AiCoaching />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="rewards" element={<Rewards />} />
              <Route path="challenges" element={<Challenges />} />
              <Route path="terms" element={<Terms />} />
              <Route path="leaderboard" element={<Leaderboard />} />
              <Route path="blog" element={<Blog />} />
              <Route path="changelog" element={<Changelog />} />
              <Route path="heatmap" element={<Heatmap />} />
              <Route path="partners" element={<Partners />} />
              <Route path="shop" element={<Shop />} />
              <Route path="waitlist" element={<WaitlistPage />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </main>
    </HeroUIProvider>
  </StrictMode>,
)