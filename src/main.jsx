import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HeroUIProvider } from "@heroui/react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import './index.css'
import App from './App.jsx'
import Features from './Features.jsx'
import Layout from './Layout.jsx'
import Reviews from './Reviews.jsx'
import Support from './Support.jsx'
import SupportCenter from './SupportCenter.jsx'
import SupportCategory from './SupportCategory.jsx'
import SupportArticle from './SupportArticle.jsx'
import CommunityGuidelines from './CommunityGuidelines.jsx'
import Careers from './Careers.jsx'
import Press from './Press.jsx'
import About from './About.jsx'
import Privacy from './Privacy.jsx'
import SystemStatus from './SystemStatus.jsx'
import DeviceIntegration from './DeviceIntegration.jsx'
import AiCoaching from './AiCoaching.jsx'
import Analytics from './Analytics.jsx'
import Rewards from './Rewards.jsx'
import Challenges from './Challenges.jsx'
import Terms from './Terms.jsx'
import Leaderboard from './Leaderboard.jsx'
import SignUp from './SignUp.jsx'
import Login from './Login.jsx'
import NotFound from './NotFound.jsx'
import Blog from './Blog.jsx'
import Changelog from './Changelog.jsx'
import Heatmap from './Heatmap.jsx'
import Partners from './Partners.jsx'
import Shop from './Shop.jsx'

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
              <Route path="signup" element={<SignUp />} />
              <Route path="login" element={<Login />} />
              <Route path="blog" element={<Blog />} />
              <Route path="changelog" element={<Changelog />} />
              <Route path="heatmap" element={<Heatmap />} />
              <Route path="partners" element={<Partners />} />
              <Route path="shop" element={<Shop />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </main>
    </HeroUIProvider>
  </StrictMode>,
)