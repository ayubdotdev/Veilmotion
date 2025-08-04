import {  BlinkingDotsComponent, DotGridAnimations, DotNetworkComponent, MovingDotsComponent } from "@/bgs/Dots";
import { GlowOrbsComponent } from "@/bgs/Effects";
import {  GlowingParticles, ParticlesBackgroundComponent, RotatingParticles } from "@/bgs/Floatings";
import { AnimatedBlackGridBackground, AnimatedGrid, RandomGeometricComponent, SphereBgComponent } from "@/bgs/Geometrics";
import { PurpleGradient, PurpleGradientTop } from "@/bgs/Gradients";


export const PatternComponents: Record<string, React.FC> = {


  "geometrics-circles-bounce": AnimatedGrid,
  //gradientrs
  "purple-gradient":PurpleGradient,
  "purple-gradient-top":PurpleGradientTop,
  "effect-glow-orbs": GlowOrbsComponent,



  //floatings
  "glowing-particles": GlowingParticles,
  "moving-particles": ParticlesBackgroundComponent,
  "rotating-particles":RotatingParticles,


  //dots
  "dots-soft-network": DotNetworkComponent,
  "moving-dots": MovingDotsComponent,
  "blinking-dots":BlinkingDotsComponent,
  "dot-grid":DotGridAnimations,

   //geometrics
  "random-geometrics":RandomGeometricComponent,
  "dark-sphere":SphereBgComponent,
  "black-grid":AnimatedBlackGridBackground,
  "animated-grid":AnimatedGrid

};
