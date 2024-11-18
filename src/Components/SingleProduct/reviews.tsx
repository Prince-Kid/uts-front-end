import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import StarRating from "./star";
import { submitReview } from "../../Redux/Action/singleProduct";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useTranslation } from "react-i18next";

interface Review {
  ratingId: string;
  ratingScore: string | null;
  feedback: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

interface ReviewFeedback {
  name: string;
  feedback: string;
  ratingScore: number;
}

const Review: React.FC<{ productId: string }> = ({ productId }) => {
  const [showContent, setShowContent] = useState(false);
  const [reviewFeedback, setReviewFeedback] = useState<ReviewFeedback>({
    name: "",
    feedback: "",
    ratingScore: 0,
  });
  const [visibleReviews, setVisibleReviews] = useState(3);
  const [ratingScore, setRating] = useState(3);
  const [reviews, setReviews] = useState<Review[]>([]);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { loading: isLoading, error } = useSelector(
    (state: any) => state.reviews
  );
  const API_URL: any = `${process.env.BACKEND_API_URL}`;
  useEffect(() => {
    fetch(`${API_URL}/getfeedback/${productId}`)
      .then((response) => response.json())
      .then((data) => setReviews(data.ratings || []))
      .catch((error) => console.error("Error fetching reviews:", error));
  }, [productId]);

  const showMore = () => {
    setVisibleReviews((prev) => prev + 3);
  };

  const showLess = () => {
    setVisibleReviews(3);
  };

  const toggleContent = () => {
    setShowContent(!showContent);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setReviewFeedback({
      ...reviewFeedback,
      [name]: value,
    });
  };

  const handleRatingChange = (selectedRating: number) => {
    setRating(selectedRating);
    setReviewFeedback({
      ...reviewFeedback,
      ratingScore: selectedRating,
    });
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (productId) {
      const reviewPayload = {
        productId,
        data: reviewFeedback,
      };
      dispatch(submitReview(reviewPayload) as any).then(() => {
        setReviewFeedback({
          name: "",
          feedback: "",
          ratingScore: 0,
        });

        fetch(`${API_URL}/getfeedback/${productId}`)
          .then((response) => response.json())
          .then((data) => setReviews(data.ratings || [])) // Ensure default to empty array
          .catch((error) => console.error("Error fetching reviews:", error));
      });
    }
  };

  return (
    <div className="flex justify-center md:flex-col items-center lg:flex-col flex-col">
      <div className="md:w-4/5 w-full p-5 py-4">
        <h1 className="text-4xl font-extrabold">Review</h1>
        <div className="w-full flex flex-col gap-3 justify-center">
          <div className="flex pt-4 justify-between">
            <div>
              {isLoading ? (
                <Skeleton width={50} />
              ) : (
                `${reviews.length || 0} Reviews`
              )}
            </div>
            <div className="flex">
              <div className="flex flex-col">
                <div className="flex gap-1">
                  <StarRating rating={4} />
                </div>
                <div
                  className="cursor-pointer text-[#5ECE7B] text-center"
                  onClick={toggleContent}
                >
                  {t("Leave my review")}
                </div>
              </div>
              <span>{isLoading ? <Skeleton width={50} /> : `4 rates`}</span>
            </div>
          </div>
          {showContent && (
            <div className="flex justify-center">
              <div className="md:ml-0 py-4 w-4/5 flex flex-col justify-center ">
                <div className="bg-[#F9FAFB] mt-7 p-2.5 grid md:grid-cols-2 grid-cols-1 justify-between  md:w-full">
                  <p className="md:w-w-full w-full">
                    {t("How will you rate this product")}?
                  </p>
                  <div className="mr-0 md:mr-4">
                    <StarRating
                      rating={ratingScore}
                      onRatingChange={handleRatingChange}
                      clickable={true}
                    />
                  </div>
                </div>
                <form
                  onSubmit={handleFormSubmit}
                  className="py-4 flex flex-col items-center gap-4 justify-center md:w-full w-full"
                >
                  <input
                    type="text"
                    name="name"
                    placeholder="name....."
                    onChange={handleInputChange}
                    value={reviewFeedback.name}
                    className="bg-white border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  />
                  <textarea
                    name="feedback"
                    rows={4}
                    className="block mt-5 p-2.5 w-full text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    value={reviewFeedback.feedback}
                    onChange={handleInputChange}
                    placeholder="Any feedback you would like to give your account manager..."
                  ></textarea>
                  <button
                    type="submit"
                    className=" bg-orange-400  text-white font-extrabold p-3 md:w-1/2 w-full rounded-lg"
                    disabled={isLoading}
                  >
                    {isLoading ? "Submitting..." : "Submit Feedback"}
                  </button>
                  {error && <p className="text-red-500 mt-2">{error}</p>}
                </form>
              </div>
            </div>
          )}
          {isLoading
            ? Array(visibleReviews)
                .fill(0)
                .map((_, index) => (
                  <div key={index} className="grid grid-cols-10 gap-8 mb-4">
                    <div className="col-span-2 flex justify-center items-baseline">
                      <Skeleton circle={true} height={64} width={64} />
                    </div>
                    <div className="col-span-8 gap-y-4 flex flex-col items-baseline">
                      <Skeleton width="60vw" height={24} />
                      <div className="flex gap-4">
                        <Skeleton width="70vw" height={24} />
                      </div>
                      <Skeleton width="60vw" height={20} />
                      <Skeleton count={3} />
                    </div>
                  </div>
                ))
            : reviews.slice(0, visibleReviews).map((review, index) => (
                <div
                  key={review.ratingId}
                  className="grid grid-cols-10 gap-8 mb-4"
                >
                  <div className="col-span-2 flex justify-center items-baseline">
                    <span className="bg-gray-500 rounded-full md:p-8 md:w-4 w-4 p-4 h-4 md:h-4 md:text-4xl text-md text-center flex justify-center items-center font-bold text-[#C9974C]">
                      {index + 1}
                    </span>
                  </div>
                  <div className="col-span-8 gap-y-4 flex flex-col items-baseline">
                    <span className="text-[#C9974C] text-xl font-bold">
                      {review.name}
                    </span>
                    <div className="flex gap-1">
                      <StarRating
                        rating={
                          review.ratingScore ? Number(review.ratingScore) : 0
                        }
                      />
                    </div>
                    <data>
                      {new Date(review.createdAt).toLocaleDateString()}
                    </data>
                    <p>{review.feedback}</p>
                  </div>
                </div>
              ))}
          <div className="flex justify-start mt-4">
            {visibleReviews < (reviews.length || 0) && (
              <button
                onClick={showMore}
                className="mr-2 px-4 py-2 bg-blue-500 text-white rounded"
              >
                {t("Show More")}
              </button>
            )}
            {visibleReviews > 3 && (
              <button
                onClick={showLess}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                {t("Show Less")}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
