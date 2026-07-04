import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="not-found">
      <div className="wrap">
        <h1>Page not found</h1>
        <p>The page you are looking for is not in the current Promethix Lab catalogue.</p>
        <Button asChild>
          <Link href="/">Back home</Link>
        </Button>
      </div>
    </section>
  );
}
