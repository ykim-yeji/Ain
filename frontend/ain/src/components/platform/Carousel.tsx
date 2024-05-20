// Carousel.tsx

interface CarouselProps {
  items: { idealPersonImageUrl: string; idealPersonNickname: string }[]; // Array of objects with image and nickname
  selectedImage: string; // Currently selected image URL (optional)
  onSelectImage: (imageUrl: string) => void; // Function to handle image selection
}

// Carousel.tsx

const Carousel: React.FC<CarouselProps> = ({ items, selectedImage, onSelectImage }) => {

  console.log(items)

  return (
    <div className="" style={{ height: "110px", overflowX: "auto", display: "flex", justifyContent: "space-between" }}>
      <div className="space-x-4" style={{ display: "flex", alignItems: "center" }}>
        {items.map((item, index) => (
          <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div
              className="rounded-t-lg" 
              style={{ 
                backgroundColor: item.idealPersonImageUrl === selectedImage ? '#FDCEDF' : '#F9F5F6', // 선택된 이미지일 경우 배경색을 #D6E4FF로 변경
                padding: '5px',
              }}
            >
              <img
                src={item.idealPersonImageUrl}
                className="w-auto h-auto cursor-pointer"
                onClick={() => onSelectImage(item.idealPersonImageUrl)}
                alt={`Ideal Person ${index + 1}`}
                style={{ width: "75px", height: "75px", objectFit: "cover" }}
              />
            </div>
            <div
              className="rounded-b-lg" 
              style={{ 
                marginTop: '0',
                width: '85px',
                backgroundColor: item.idealPersonImageUrl === selectedImage ? '#F2BED1' : '#F8E8EE',
                padding: '2px 5px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <p className="text-xs text-gray-500" style={{ margin: 0 }}>{item.idealPersonNickname}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;

