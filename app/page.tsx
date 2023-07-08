import Image from "next/image";

export default function Home() {
  return (
    <section className="flex items-center justify-center h-screen">
      <div className="absolute top-0 w-full h-screen bg-gradient-to-b from-black to-transparent" />
      <div className="relative z-30">
        <h1 className="font-black text-9xl">GAIMIZ</h1>
      </div>
    </section>
  );
}
