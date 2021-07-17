import Image from "next/image";
import Link from "next/link";

const Custom404: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <Image
        alt="Page not found"
        className="object-contain"
        src="/images/page_not_found.png"
        width={500}
        height={400}
      />
      <h1>
        Opps sepertinya Anda pergi terlalu jauh, jangan sampai mendekati lubang hitam yaaa! :), mari kembali ke{" "}
        <Link href="/">
          <a className="text-blue-500">Bumi</a>
        </Link>
      </h1>
    </div>
  );
};

export default Custom404;
