import { BuiltWith } from "@/components/sections/home/BuiltWith";
import { Capabilities } from "@/components/sections/home/Capabilities";
import { Closing } from "@/components/sections/home/Closing";
import { DesignNotes } from "@/components/sections/home/DesignNotes";
import { Ecosystem } from "@/components/sections/home/Ecosystem";
import { Examples } from "@/components/sections/home/Examples";
import { Facts } from "@/components/sections/home/Facts";
import { Hero } from "@/components/sections/home/Hero";
import { Lifecycle } from "@/components/sections/home/Lifecycle";
import { Reasons } from "@/components/sections/home/Reasons";
import { Surfaces } from "@/components/sections/home/Surfaces";
import { Toolkit } from "@/components/sections/home/Toolkit";
import { Trio } from "@/components/sections/home/Trio";

export default function HomePage() {
  return (
    <>
      <Hero />
      <BuiltWith />
      <Capabilities />
      <Examples />
      <Lifecycle />
      <Surfaces />
      <Toolkit />
      <Reasons />
      <Trio />
      <Ecosystem />
      <DesignNotes />
      <Facts />
      <Closing />
    </>
  );
}
