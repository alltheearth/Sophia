// src/pages/Financeiro/components/StatusBadge.jsx

import React from 'react';
import { CheckCircle, Clock, AlertCircle, X } from 'lucide-react';

const StatusBadge = ({ status }) => {
  const badges = {
    PAGO: {
      bg: 'bg-green-100',
      text: 'text-green-800',
      icon: CheckCircle,
      label: 'Pago'
    },
    PENDENTE: {
      bg: 'bg-yellow-100',
      text: 'text-yellow-800',
      icon: Clock,
      label: 'Pendente'
    },
    ATRASADO: {
      bg: 'bg-red-100',
      text: 'text-red-800',
      icon: AlertCircle,
      label: 'Atrasado'
    },
    CANCELADO: {
      bg: 'bg-gray-100',
      text: 'text-gray-800',
      icon: X,
      label: 'Cancelado'
    }
  };

  const badge = badges[status] || badges.PENDENTE;
  const Icon = badge.icon;

  return (
    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${badge.bg} ${badge.text}`}>
      <Icon className="w-3 h-3" />
      {badge.label}
    </span>
  );
};

export default StatusBadge;