import { ComponentProps, forwardRef, useId, useMemo } from 'react';
import UploadIcon from '@/assets/icons/upload.svg?react';
import { cn } from '@/utils';

type Props = {
  className?: string;
  acceptExtensions: string[]; // without dot
  maxSize: number; // in Mbytes
} & ComponentProps<'input'>;

const ImageUpload = forwardRef<HTMLInputElement, Props>(
  ({ className, acceptExtensions, maxSize, ...delegated }, ref) => {
    const acceptExt = useMemo(() => acceptExtensions.map((ext) => `.${ext}`).join(','), [acceptExtensions]);
    const imageDesc = useMemo(() => {
      const extensions = acceptExtensions.map((ext) => ext.toUpperCase()).join(', ');
      return `${extensions}\n(MAX ${maxSize}MB)`;
    }, [acceptExtensions, maxSize]);

    const id = useId();

    return (
      <div className={cn('flex items-center justify-center', className)}>
        <label
          htmlFor={id}
          className="flex h-48 w-48 cursor-pointer flex-col items-center justify-center rounded-full border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
        >
          <div className="flex flex-col items-center justify-center pb-6 pt-5">
            <UploadIcon />
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">Upload profile picture</span>
            </p>
            <p className="whitespace-pre-line text-center text-xs text-gray-500">{imageDesc}</p>
          </div>
          <input id={id} type="file" accept={acceptExt} className="hidden" ref={ref} {...delegated} />
        </label>
      </div>
    );
  }
);

export default ImageUpload;
