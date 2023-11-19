import { Album } from '../../types';
import { MusicApiImageSize } from '../../constants';
import Card from '../../components/Card';
import { toHHMMSS, getYear, cn } from '../../utils';
import TrackTable from './TrackTable';

interface Props {
  album: Album;
  className?: string;
}

const AlbumDetails = ({ album, className }: Props) => {
  return (
    <div className={cn('flex h-full flex-col justify-center gap-3', className)}>
      <Card className="pointer-events-none flex-row items-start">
        <Card.Image
          src={album.cover_big}
          placeholderSrc={album.cover_small}
          width={MusicApiImageSize.md.width}
          height={MusicApiImageSize.md.height}
          className="w-1/3"
        ></Card.Image>
        <div>
          <Card.Title className="text-2xl max-[800px]:text-[clamp(1.125rem,0.875rem+1.25vw,1.5rem)]">
            {album.title}
          </Card.Title>
          <Card.Description className="mb-2 text-lg text-gray-700">
            {album.artist.name}
          </Card.Description>
          <Card.Description className="mb-2">
            <>
              <span className="mr-1">{album.nb_tracks} tracks</span>
              <span>({toHHMMSS(album.duration)})</span>
            </>
          </Card.Description>
          <Card.Description>{getYear(album.release_date)}</Card.Description>
        </div>
      </Card>
      <TrackTable tracks={album.tracks.data} />
    </div>
  );
};
export default AlbumDetails;
