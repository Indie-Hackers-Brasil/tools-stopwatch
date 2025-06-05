import DualTimer from "@/components/templates/dual-timer"

export const metadata = {
  title: "Dual Timer",
  description: "A simple dual timer app",
}

export default function Page() {
  return (
    <main className="h-screen w-full">
      <DualTimer />
    </main>
  )
}
