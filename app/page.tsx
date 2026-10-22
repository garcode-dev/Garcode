import Hero from "@/components/Hero";
import Partner from "@/components/Partner";
import Ways from "@/components/Ways";
import Different from "@/components/Different";
import Expect from "@/components/Expect";
import Mission from "@/components/Mission";
import Cta from "@/components/Cta";
import { home } from "@/content/site";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Partner />
      <Ways />
      <Different />
      <Expect />
      <Mission />
      <Cta {...home.cta} social />
    </>
  );
}
