interface Review {
  id: number;
  author: string;
  vehicle: string;
  date: string;
  rating: number;
  text: string;
}

export default function Reviews() {
  const reviews: Review[] = [
    {
      id: 1,
      author: 'Куаныш',
      vehicle: 'Toyota Prado 2021 V8',
      date: '21.03.2025',
      rating: 5,
      text: 'Мотоцикл хорош катаюсь каждый день иногда даже зимой. Едет отлично катаюсь каждый...',
    },
    {
      id: 2,
      author: 'Толян',
      vehicle: 'Toyota Fortuner 2016 V8',
      date: '21.03.2025',
      rating: 4,
      text: 'Валит нормально',
    },
    {
      id: 3,
      author: 'Блондинка',
      vehicle: 'Toyota Fortuner 2016 V8',
      date: '21.03.2025',
      rating: 3,
      text: 'Я думала электрический',
    },
  ];

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, index) => (
          <span
            key={index}
            className={index < rating ? 'text-green-500' : 'text-gray-300'}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="mt-2 p-4 pb-24 rounded-[10px]">
      {reviews.map((review) => (
        <div key={review.id} className="bg-white p-4 border-b border-gray-200 py-4 last:border-0">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h4 className="font-semibold text-gray-900">{review.author}</h4>
              <p className="text-xs text-gray-500">{review.vehicle}</p>
            </div>
            <div className="text-right">
              {renderStars(review.rating)}
              <p className="text-xs text-gray-500 mt-1">{review.date}</p>
            </div>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed">{review.text}</p>
          <button className="text-green-600 text-sm font-medium mt-2">
            показать полностью
          </button>
        </div>
      ))}
    </div>
  );
}
