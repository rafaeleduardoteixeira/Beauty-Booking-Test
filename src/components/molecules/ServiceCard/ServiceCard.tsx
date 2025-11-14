import Image from 'next/image';
import { Badge } from '@components/atoms/Badge';
import { Button } from '@components/atoms/Button';
import { IServiceCardProps } from './types';

export const ServiceCard = ({
  title,
  description,
  rating,
  reviewCount,
  price,
  duration,
  image,
  badgeLabel,
  accentColor,
  onBook,
}: IServiceCardProps) => {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-md hover:shadow-lg">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 hover:scale-105"
        />
        {badgeLabel ? (
          <div className="absolute left-3 top-3">
            <Badge label={badgeLabel} background="rgba(255,255,255,0.9)" color={accentColor} />
          </div>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5 text-left">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
          <span className="text-sm font-semibold text-slate-600">
            ⭐ {rating.toFixed(1)} <span className="text-xs text-slate-400">({reviewCount})</span>
          </span>
        </div>
        <p className="text-sm text-slate-500">{description}</p>
        <div className="text-xs font-medium uppercase tracking-wide text-slate-400">{duration} min session</div>
        <div className="mt-auto flex items-center justify-between">
          <div className="text-left">
            <p className="text-xs text-slate-400">From</p>
            <p className="text-xl font-bold" style={{ color: accentColor }}>
              ${price}
            </p>
          </div>
          <Button accentColor={accentColor} onClick={onBook}>
            Book
          </Button>
        </div>
      </div>
    </article>
  );
}
