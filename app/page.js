import Hero from "@/components/Hero";
import ButtonSignin from "@/components/ButtonSignin";

export default function Home() {
  return (
    <main>
      <div className="absolute top-4 right-4 z-50">
        <ButtonSignin />
      </div>
      <Hero />
    </main>
  );
}
