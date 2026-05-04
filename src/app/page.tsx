import { JSX } from 'react'
import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { HomeHeroSkeleton } from './_components/home-hero-skeleton'
import { HomeAboutSkeleton } from './_components/home-about-skeleton'
import { HomeOurMotivationSkeleton } from './_components/home-our-motivation-skeleton'
import { HomeServicesSkeleton } from './_components/home-services-skeleton'
import { HomeCTASkeleton } from './_components/home-cta-skeleton'
import { HomeContactSkeleton } from './_components/home-contact-skeleton'

const HomeHero = dynamic(() => import('./_components/home-hero').then(m => ({ default: m.HomeHero })), {
  loading: () => <HomeHeroSkeleton />
})
const HomeAbout = dynamic(() => import('./_components/home-about').then(m => ({ default: m.HomeAbout })), {
  loading: () => <HomeAboutSkeleton />
})
const HomeOurMotivation = dynamic(() => import('./_components/home-our-motivation').then(m => ({ default: m.HomeOurMotivation })), {
  loading: () => <HomeOurMotivationSkeleton />
})
const HomeServices = dynamic(() => import('./_components/home-services').then(m => ({ default: m.HomeServices })), {
  loading: () => <HomeServicesSkeleton />
})
const HomeCTA = dynamic(() => import('./_components/home-cta').then(m => ({ default: m.HomeCTA })), {
  loading: () => <HomeCTASkeleton />
})
const HomeContact = dynamic(() => import('./_components/home-contact').then(m => ({ default: m.HomeContact })), {
  loading: () => <HomeContactSkeleton />
})

const HomePage = (): JSX.Element => {
  return (
    <>
      <Suspense fallback={<HomeHeroSkeleton />}>
        <HomeHero />
      </Suspense>
      <Suspense fallback={<HomeAboutSkeleton />}>
        <HomeAbout />
      </Suspense>
      <Suspense fallback={<HomeOurMotivationSkeleton />}>
        <HomeOurMotivation />
      </Suspense>
      <Suspense fallback={<HomeServicesSkeleton />}>
        <HomeServices />
      </Suspense>
      <Suspense fallback={<HomeCTASkeleton />}>
        <HomeCTA />
      </Suspense>
      <Suspense fallback={<HomeContactSkeleton />}>
        <HomeContact />
      </Suspense>
    </>
  )
}

export default HomePage