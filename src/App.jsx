import Nav from './components/Nav'
import Hero from './components/Hero'
import HowItWorks from './components/HowItWorks'
import MachineSection from './components/MachineSection'
import ForYourGym from './components/ForYourGym'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { machines } from './data/machines'

export default function App() {
  return (
    <>
      <Nav />
      <Hero />
      <HowItWorks />
      <section id="machines">
        {machines.map(machine => (
          <MachineSection key={machine.id} machine={machine} />
        ))}
      </section>
      <ForYourGym />
      <Contact />
      <Footer />
    </>
  )
}
