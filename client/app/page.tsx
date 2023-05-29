import Image from "next/image";
import "@fontsource/roboto/300.css";

export default function Home() {
  return (
    <main>
      <div>
        <Image
          src="/Ice_bear.webp"
          alt="Ice Bear"
          width={230}
          height={150}
          priority
        />
        <h1 style={{ fontFamily: "Roboto" }}>Gavin's React Lab</h1>
      </div>

      <div>
        <a href="/fruits-page">
          <h2>
            Fruits List <span>-&gt;</span>
          </h2>
        </a>
        <a href="/image-classification-page">
          <h2>
            Image Classification <span>-&gt;</span>
          </h2>
        </a>
      </div>
    </main>
  );
}
