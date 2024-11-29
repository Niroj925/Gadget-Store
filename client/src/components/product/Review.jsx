import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  Button,
  Image,
  Textarea,
  Text,
  Group,
  Title,
  Divider,
  Rating,
} from "@mantine/core";
import { useNavigate, useSearchParams } from "react-router-dom";
import { axiosPublicInstance } from "../../api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { product, review } from "../../api/product/product";
import { toast } from "react-toastify";

const ProductReview = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [comment, setComment] = useState("");
  const [star, setStar] = useState(0);

  const productId = params.get("productId");
  const customerId = params.get("customerId");

  const {
    isLoading,
    data,
    error: errorToGet,
  } = useQuery({
    queryKey: ["product", productId],
    queryFn: async () => {
      const response = await axiosPublicInstance.get(`${product}/${productId}`);
      return response.data;
    },
  });

  // console.log(data);
  const handleSubmit = async () => {
    const data = {
      customerId,
      productId,
      rating: star,
      review: comment, // Ensure the key matches your backend
    };

    try {
      const response = await axiosPublicInstance.post("/review", data);
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const { mutate: mutateCreateReview, isPending } = useMutation({
    mutationFn: handleSubmit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["review", productId] });
      toast.success("Thanks for review this product!");
      navigate("/");
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || "Error creating review.";
      toast.error(errorMessage);
    },
  });

  return (
    <Container size="md" py="xl">
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Group position="center" mb="md">
          <Title order={3}>Rating and Reviews</Title>
        </Group>
        <Divider my="md" />

        <Group grow align="center">
          <Image
            src={data?.image[0].image}
            alt={data?.name}
            width={200}
            height={200}
            radius="md"
          />
          <div>
            <Title order={4}>{data?.name}</Title>
            <Text size="lg">Price: Rs.{data?.price}</Text>
            {/* <Text size="md">Brand: {product.brand}</Text> */}
            <Text mt="md">Rate this:</Text>
            <Rating
              value={star}
              onChange={setStar} // Set the rating value on change
              size="lg"
              count={5}
              mt="sm"
            />
          </div>
        </Group>

        <Divider my="md" />
        <Textarea
          label="Comment"
          placeholder="Leave a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          minRows={3}
          maxRows={5}
          autosize
          style={{ marginTop: "10px" }}
        />
        <Group justify="center">
          <Button
            loading={isPending}
            onClick={mutateCreateReview}
            w={"20%"}
            mt="md"
            bg={"#414977"}
            p={5}
          >
            Submit
          </Button>
        </Group>
      </Card>
    </Container>
  );
};

export default ProductReview;
