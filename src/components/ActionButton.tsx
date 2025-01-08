import React from 'react';
import { Link } from 'react-router-dom';

interface ActionButtonProps {
  to: string;
  children: React.ReactNode;
}

export default function ActionButton({ to, children }: ActionButtonProps) {
  return (
    <Link
      to={to}
      className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
    >
      {children}
    </Link>
  );
}