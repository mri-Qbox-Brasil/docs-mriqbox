import CreatorCode from '@components/CreatorCode';

type CreatorTuple = [string, string, string, number, string];

function CreatorCodes(data: CreatorTuple[]) {
  return (
    <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {data
        .sort((a, b) => a[0].localeCompare(b[0]))
        .map(([storeName, storeLink, code, percentOff, storeImage]) => (
          <CreatorCode
            key={storeName}
            storeName={storeName}
            storeLink={storeLink}
            code={code}
            percentOff={percentOff}
            storeImage={storeImage}
          />
        ))}
    </div>
  );
}

export default CreatorCodes;
