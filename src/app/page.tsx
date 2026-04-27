import { JSX } from 'react'

// components
import { HomeHero } from './_components/home-hero'
import { HomeAbout } from './_components/home-about'
import { HomeOurMotivation } from './_components/home-our-motivation'
import { HomeServices } from './_components/home-services'
import { HomeCTA } from './_components/home-cta'
import { HomeContact } from './_components/home-contact'

const HomePage = (): JSX.Element => {
  return (
    <>
      <HomeHero />
      <HomeAbout />
      <HomeOurMotivation />
      <HomeServices />
      <HomeCTA />
      <HomeContact />
    </>
  )
}

export default HomePage