import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

const GoogleOAuth = () => {
  const router = useRouter();

  const path = router.pathname.split("/")[1];

  return (
    <div className="bg-blue-500  sm:w-8/12 rounded-sm shadow-lg cursor-pointer">
      <Link href="/auth/oauth/google">
        <a className="p-1 flex items-center">
          <div className="p-1 bg-white">
            <Image src="/images/google.png" alt="google" className="bg-contain" width={30} height={30} />
          </div>
          <span className="text-white ml-4 font-bold text-md tracking-normal">
            Sign {path === "signin" ? "In" : "Up"} with google
          </span>
        </a>
      </Link>
    </div>
  );
};

export default GoogleOAuth;
