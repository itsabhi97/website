import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Code2, Database, Cloud, Github, Linkedin, Mail } from "lucide-react";
import TechStack from "@/components/TechStack";
import ExperienceSection from "@/components/ExperienceSection";
import Typewriter from "@/components/animations/Typewriter";
import FadeIn from "@/components/animations/FadeIn";

export default function Home() {
  return (
    <div className="flex flex-col items-start justify-center min-h-[80vh] w-full animate-in fade-in zoom-in duration-700">

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 w-full items-center mb-16">
        <div className="lg:col-span-7 flex flex-col items-start order-2 lg:order-1">
          {/* <div className="space-y-2 mb-6">
            <div className="inline-flex items-center space-x-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm font-medium text-neutral-300 backdrop-blur-md">
              <span className="flex h-2 w-2 rounded-full bg-green-500 animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]"></span>
              <span>Available for new opportunities</span>
            </div>
          </div> */}

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight min-h-[140px] md:min-h-[180px]">
            <Typewriter text="Abhishek Kurhekar" delay={0.2} /> <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 text-3xl md:text-5xl block mt-4">
              <Typewriter text="Data Engineer III" delay={1.0} />
            </span>
          </h1>

          <FadeIn delay={1.8}>
            <p className="text-lg md:text-xl text-neutral-400 mb-10 leading-relaxed max-w-2xl">
              6+ years of hands-on experience in Data Engineering and Analytics across major clouds (Azure, GCP, AWS) and BI Tools. Proven track record of building robust frameworks around data pipelines to ensure data quality and integrity at terabyte-scale.
            </p>
          </FadeIn>

          <FadeIn delay={2.0}>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link
                href="/projects"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-black bg-white hover:bg-neutral-200 transition-colors duration-200"
              >
                View Work <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 border border-white/10 text-base font-medium rounded-lg text-white bg-white/5 hover:bg-white/10 transition-colors duration-200"
              >
                Get in Touch
              </Link>
            </div>
          </FadeIn>
        </div>

        <div className="lg:col-span-5 flex flex-col justify-center lg:items-end order-1 lg:order-2">
          <div className="flex flex-col items-center">
            <FadeIn direction="left" delay={0.5}>
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white/10 shadow-[0_0_40px_-10px_rgba(59,130,246,0.3)] group mx-auto">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 mix-blend-overlay z-10 transition-opacity duration-500 group-hover:opacity-0" />
                <Image
                  src="/images/profile.jpg"
                  alt="Developer Profile Picture"
                  fill
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-110"
                  priority
                />
              </div>
            </FadeIn>

            <FadeIn direction="up" delay={0.8} className="mt-8">
              <div className="flex items-center space-x-6">
                <Link href="https://github.com/itsabhi97" target="_blank" className="text-neutral-400 hover:text-white hover:scale-110 transition-all duration-300">
                  <Github className="w-7 h-7" />
                </Link>
                <Link href="https://www.linkedin.com/in/abhishek-kurhekar-239ab7155/" target="_blank" className="text-neutral-400 hover:text-[#0A66C2] hover:scale-110 transition-all duration-300">
                  <Linkedin className="w-7 h-7" />
                </Link>
                <Link href="mailto:akurhekar0@gmail.com" className="text-neutral-400 hover:text-red-400 hover:scale-110 transition-all duration-300">
                  <Mail className="w-7 h-7" />
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full pt-8 border-t border-white/5">
        <div className="flex flex-col space-y-3 group">
          <Database className="w-8 h-8 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
          <h3 className="font-semibold text-lg text-neutral-200">Data Engineering</h3>
          <p className="text-neutral-500 text-sm leading-relaxed">Designing scalable data lakes, resilient ETL pipelines, and warehouse architectures.</p>
        </div>
        <div className="flex flex-col space-y-3 group">
          <Code2 className="w-8 h-8 text-purple-400 group-hover:scale-110 transition-transform duration-300" />
          <h3 className="font-semibold text-lg text-neutral-200">Software Dev</h3>
          <p className="text-neutral-500 text-sm leading-relaxed">Designing and developing applications with robust backend APIs for modern scale.</p>
        </div>
        <div className="flex flex-col space-y-3 group">
          <Cloud className="w-8 h-8 text-indigo-400 group-hover:scale-110 transition-transform duration-300" />
          <h3 className="font-semibold text-lg text-neutral-200">Cloud Platform</h3>
          <p className="text-neutral-500 text-sm leading-relaxed">Designing and deploying highly-available cloud-native systems with modern DevOps practices.</p>
        </div>
      </div>

      <TechStack />
      <ExperienceSection />
    </div>
  );
}
