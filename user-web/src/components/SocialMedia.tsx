import { cn } from '@/lib/utils';
import { Facebook, Github, Linkedin, Slack, Youtube } from 'lucide-react';
import React from 'react'

function SocialMedia({className}: {className?: string}) {
    const socialLink = [
  {
    title: "Youtube",
    href: "https://www.youtube.com/@reactjsBD",
    icon: <Youtube className="w-5 h-5" />,
  },
  {
    title: "Github",
    href: "https://www.youtube.com/@reactjsBD",
    icon: <Github className="w-5 h-5" />,
  },
  {
    title: "Linkedin",
    href: "https://www.youtube.com/@reactjsBD",
    icon: <Linkedin className="w-5 h-5" />,
  },
  {
    title: "Facebook",
    href: "https://www.youtube.com/@reactjsBD",
    icon: <Facebook className="w-5 h-5" />,
  },
  {
    title: "Slack",
    href: "https://www.youtube.com/@reactjsBD",
    icon: <Slack className="w-5 h-5" />,
  },
];

  return (
    <div className='flex gap-4'>
      {socialLink.map((link) => (
        <a key={link.title} href={link.href} target="_blank" rel="noopener noreferrer" className={cn("text-gray-600 hover:text-gray-900 transition-colors", className)}>
          {link.icon}
        </a>
      ))}
    </div>
  )
}

export default SocialMedia