import React from 'react';
import StepLaunchSVG from '../assets/step-launch.svg?react';
import StepBuildSVG from '../assets/step-build.svg?react';
import StepDiscoverSVG from '../assets/step-discover.svg?react';
import StepPlanningSVG from '../assets/step-planning.svg?react';

export default function HowItWorksSection() {
  return (
    <div className="HowItWorksSection">
      <h1 className="SectionTitle">How it Works</h1>
      <div className="StepContainer">
        <ol className="Steps">
          <li className='Step'>
            <StepCard
              title="Discovery"
              description="We start by understanding your business goals, target audience, and constraints to ensure we’re solving the right problem from day one."
              image={<StepDiscoverSVG />}
            />
          </li>
          <li className='Step'>
            <StepCard
              title="Planning"
              description="We define the structure, features, and technical approach, creating a clear roadmap that aligns scope, timeline, and expectations."
              image={<StepPlanningSVG />}
            />
          </li>
          <li className='Step'>
            <StepCard
              title="Build"
              description="We design and develop the solution iteratively, sharing progress and refining details to deliver a high-quality, scalable result."
              image={<StepBuildSVG/>}
            />
          </li>
          <li className='Step'>
            <StepCard
              title="Launch"
              description="We thoroughly test, deploy, and support the final product, ensuring a smooth release and long-term stability."
              image={<StepLaunchSVG />}
            />
          </li>
        </ol>
      </div>
    </div>
  )
}


export function StepCard({ title, description, image }) {
  return (
    <div className="StepCard">
      <div className="StepCardImage hidden md:flex">
        {image}
      </div>
      <div className="StepCardText">
        <h3 className="StepCardTitle">{title}</h3>
        <p className="StepCardDescription">{description}</p>
      </div>
    </div>
  )
}

