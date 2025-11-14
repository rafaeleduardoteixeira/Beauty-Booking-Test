import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { SearchInput } from '@components';
import { useCompany } from '@features/company/hooks/useCompany';
import { IHeaderProps } from './types';

export const Header = ({ handleSearch }: IHeaderProps) => {
  const { company, slug } = useCompany();
  const searchParams = useSearchParams();
  const initialValue = searchParams?.get('q') ?? '';
  const accentColor = company?.primaryColor ?? '#ef4444';

  return (
    <header className="border-b border-slate-200 bg-gray-50">
      <div className="mx-auto flex w-full items-center gap-6 px-6 py-4">
        <Link href={`/${slug}`} className="text-lg font-semibold text-slate-900">
          <div>
            {company?.logo ? (
              <img src={company?.logo} alt={company?.name ?? 'Company logo'} className="max-h-25 w-auto object-contain" />
            ) : (
              <p className="text-lg font-semibold text-slate-900">{company?.name}</p>
            )}
          </div>
        </Link>
          <div className="flex flex-1 justify-center">
            <SearchInput
              className="w-full max-w-3xl"
              accentColor={accentColor}
              handleSearch={handleSearch}
              initialValue={initialValue}
            />
          </div>
      </div>
    </header>
  );
}
