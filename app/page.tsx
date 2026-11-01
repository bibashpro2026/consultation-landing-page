import Benefits from "@/components/Benefits";
import CTAForm from "@/components/CTAForm";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Process from "@/components/Process";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Problem />
      <Benefits />
      <Process />
      {/* Urgency section intentionally omitted because no genuine urgency or scarcity details were provided. */}
      <CTAForm />
    </main>
  );
}
