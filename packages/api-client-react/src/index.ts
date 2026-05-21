import { useQuery, useMutation, type UseQueryResult, type UseMutationResult } from "@tanstack/react-query";

export interface Review {
  id: number;
  name: string;
  company?: string;
  quote: string;
  rating: number;
  createdAt: string;
}

// Mock data storage (in production, this would be an API call)
const mockReviews: Review[] = [
  {
    id: 1,
    name: "Alex Johnson",
    company: "Tech Startup",
    quote: "Esther's frontend work was exceptional. Great attention to detail and excellent communication.",
    rating: 5,
    createdAt: new Date().toISOString(),
  },
];

let nextId = 2;

export function getListReviewsQueryKey() {
  return ["reviews", "list"];
}

export function useListReviews(): UseQueryResult<Review[], Error> {
  return useQuery({
    queryKey: getListReviewsQueryKey(),
    queryFn: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      return mockReviews;
    },
  });
}

export function useCreateReview(): UseMutationResult<Review, Error, { data: Omit<Review, "id" | "createdAt"> }, unknown> {
  return useMutation({
    mutationFn: async (params) => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      const newReview: Review = {
        id: nextId++,
        ...params.data,
        createdAt: new Date().toISOString(),
      };
      mockReviews.push(newReview);
      return newReview;
    },
  });
}

export function useDeleteReview(): UseMutationResult<void, Error, { id: number }, unknown> {
  return useMutation({
    mutationFn: async (params) => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      const index = mockReviews.findIndex(r => r.id === params.id);
      if (index !== -1) {
        mockReviews.splice(index, 1);
      }
    },
  });
}
