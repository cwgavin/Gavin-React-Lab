import Image from "next/image";

export default function Home() {
  return (
    <main>
      <div>
        <Image
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      <div>
        <a href="/subpage">
          <h2>
            Subpage <span>-&gt;</span>
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
