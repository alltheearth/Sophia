// src/pages/Financeiro/components/ResumoCard.jsx

import React from 'react';
import { TrendingUp } from 'lucide-react';

const ResumoCard = ({ 
  title, 
  value, 
  subtitle, 
  meta, 
  percentual, 
  variacao, 
  extraInfo,
  icon: Icon, 
  color,
  showProgress 
}) => {
  const formatCurrency = (val) => {
    if (typeof val === 'number') {
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(val);
    }
    return val;
  };

  const colorClasses = {
    green: {
      bg: 'bg-green-500',
      text: 'text-green-600',
      border: 'border-green-500',
      progress: 'bg-green-500'
    },
    blue: {
      bg: 'bg-blue-500',
      text: 'text-blue-600',
      border: 'border-blue-500',
      progress: 'bg-blue-500'
    },
    red: {
      bg: 'bg-red-500',
      text: 'text-red-600',
      border: 'border-red-500',
      progress: 'bg-red-500'
    },
    yellow: {
      bg: 'bg-yellow-500',
      text: 'text-yellow-600',
      border: 'border-yellow-500',
      progress: 'bg-yellow-500'
    }
  };

  const colors = colorClasses[color] || colorClasses.blue;

  return (
    <div className={`bg-white rounded-xl shadow-sm p-6 border-l-4 ${colors.border}`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-gray-600 text-sm font-medium">{title}</h3>
        <Icon className={`w-5 h-5 ${colors.text}`} />
      </div>
      
      <p className="text-3xl font-bold text-gray-800 mb-2">
        {formatCurrency(value)}
      </p>
      
      <div className="flex items-center justify-between text-sm">
        {subtitle && (
          <span className="text-gray-600">
            {typeof subtitle === 'number' ? formatCurrency(subtitle) : subtitle}
          </span>
        )}
        {meta && (
          <span className="text-gray-600">
            Meta: {formatCurrency(meta)}
          </span>
        )}
        {variacao && (
          <span className={`${colors.text} font-medium`}>
            +{variacao}%
          </span>
        )}
        {percentual && !variacao && (
          <span className={`${colors.text} font-medium`}>
            {percentual}%
          </span>
        )}
        {extraInfo && (
          <span className={`${colors.text} font-medium`}>
            {extraInfo}
          </span>
        )}
      </div>
      
      {showProgress && percentual && (
        <div className="mt-3 bg-gray-200 rounded-full h-2">
          <div 
            className={`${colors.progress} h-2 rounded-full transition-all duration-500`}
            style={{ width: `${percentual}%` }}
          />
        </div>
      )}
    </div>
  );
};

export default ResumoCard;