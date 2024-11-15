import React, { useState } from "react";
import {
  Flex,
  Paper,
  Text,
  Box,
  Group,
  Button,
  Table,
  Divider,
  Pagination,
  Anchor,
  Image,
  Checkbox,
  Menu,
  Switch,
  SegmentedControl,
  Modal,
  Center,
} from "@mantine/core";
import { IconFilter, IconPlus, IconReplaceFilled, IconTrash } from "@tabler/icons-react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { bulkDelete, bulkStatusUpdate, product } from "../../../api/product/product";
import { axiosPrivateInstance, axiosPublicInstance } from "../../../api";
import { categoryProduct } from "../../../api/product/category";
import { useDisclosure } from "@mantine/hooks";
import { toast } from "react-toastify";
function CategoryProduct() {
  const navigate = useNavigate();
  const queryClient=useQueryClient();
  const [deleteModel, { open: deleteModelOpen, close:deleteModelClose }] = useDisclosure(false);
  const [updateModel, { open: updateModelOpen, close:updateModelClose }] = useDisclosure(false);
  const [activePage, setPage] = useState(1);
  const [searchParams] = useSearchParams();
  const [selectedProductIds, setSelectedProductIds] = useState([]);
  const [checked, setChecked] = useState(false);
  const id = searchParams.get("id");
  console.log('id:',id);

  const  productStatus={
    available : "available",
    unavailabe : "unavailable"
}

  const {
    isLoading,
    data,
    error: errorToGet,
  } = useQuery({
    queryKey: [id],
    queryFn: async () => {
      const response = await axiosPublicInstance.get(
        `${categoryProduct}/${id}`
      );
      return response.data;
    },
  });
 
  const handleCheckboxChange = (productId, isChecked) => {
    console.log('sid:',productId);
    if (isChecked) {
      setSelectedProductIds((prevIds) => [...prevIds, productId]); 
    } else {
      setSelectedProductIds((prevIds) => prevIds.filter(id => id !== productId)); 
    }
  };

  const handleDelete = async () => {
    const body = {
      productIds:selectedProductIds,
    };

    try {
      console.log(body);
      const resp = await axiosPrivateInstance.patch(bulkDelete, body, {});
      console.log("resp:", resp.data);
      return resp.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const { isPending:deletePending, mutate: mutateDeleteProduct} = useMutation({
    mutationFn: handleDelete,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["product"],
        // refetchType: "active",
        // exact: true,
      });
      setSelectedProductIds([]);
      toast.success("Product deleted successfully");
      navigate("/dashboard/all-product");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleUpdate = async () => {
    const body = {
      productIds:selectedProductIds,
    };

    try {
      console.log(body);
      let status=checked?productStatus.available:productStatus.unavailabe;
      const resp = await axiosPrivateInstance.patch(`${bulkStatusUpdate}?status=${status}`, body, {});
      console.log("resp:", resp.data);
      return resp.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const { isPending, mutate: mutateUpdateProduct} = useMutation({
    mutationFn: handleUpdate,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["product"],
        // refetchType: "active",
        // exact: true,
      });
      setSelectedProductIds([]);
      toast.success("Product status updated successfully");
      navigate("/dashboard/all-product");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  console.log('Selected IDs:', selectedProductIds); 

  const handleDeleteBulk=()=>{
    mutateDeleteProduct();
    deleteModelClose();
  }

  const handleUpdateBulk=()=>{
    mutateUpdateProduct();
    updateModelClose();
  }




  // Generate table rows
  const rows = data?.products?.map((product) => (
    <Table.Tr key={product.id}>
      <Table.Td>
        <Checkbox
          checked={selectedProductIds.includes(product.id)}
          onChange={(e) => handleCheckboxChange(product.id, e.target.checked)}
        />
      </Table.Td>
      <Table.Td>
        <Image src={`${product.image}`} style={{ width: 60, height: 60, objectFit: 'cover' }} />
      </Table.Td>
      <Table.Td>{product.name}</Table.Td>
      <Table.Td>{product.price}</Table.Td>
      <Table.Td>{product.status}</Table.Td>
      <Table.Td>
        <Anchor onClick={() => navigate(`/dashboard/product?id=${product.id}`)}>Details</Anchor>
      </Table.Td>
    </Table.Tr>
  ));



  return (
    <Paper withBorder>
      <Flex direction={"row"} justify={"space-between"} align={"center"} p={10}>
        <Group>
          <Text>{data?.name}</Text>
        </Group>
        <Flex gap={20}>
          {
            selectedProductIds.length>0&&(

         
          // <Button
          //   // onClick={() => navigate("/dashboard/add-product")}
          //   rightSection={<IconPlus />}
          // >
          //   Action
          // </Button>
          <Menu shadow="md" width={200}>
          <Menu.Target>
            <Button variant="outline" >
              Action
            </Button>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item onClick={() => setPaymentStatus("allProduct")} 
            rightSection={<IconTrash color="red" size={20} onClick={()=>deleteModelOpen()}/>}>
             <Text w={'bold'} c={'red'}>Delete</Text> 
            </Menu.Item>
             <Menu.Item onClick={() => setPaymentStatus("topSales")} rightSection={
                <Flex justify={'center'} gap={10}>
                <Switch
                size="lg"
                checked={checked}
                onChange={(event) => setChecked(event.currentTarget.checked)}
                onLabel={
                  <Text c="white" weight={700} size="sm">
                    On
                  </Text>
                }
                offLabel={
                  <Text c="white" weight={700} size="sm">
                    Off
                  </Text>
                }
                styles={(theme) => ({
                  track: {
                    backgroundColor:checked? theme.colors.green[6]:theme.colors.red[6],
                  }
                })}
               c={'black'}
              />
              <IconReplaceFilled color="#228BE6" onClick={()=>updateModelOpen()}/>
              </Flex>  
            }>

              Availability
            </Menu.Item> 
          </Menu.Dropdown>
        </Menu>
             )
            }
        </Flex>
      </Flex>
      <Divider />
      <Box>
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th></Table.Th>
              <Table.Th></Table.Th>
              <Table.Th>Product Name </Table.Th>
              <Table.Th>Price</Table.Th>
              {/* <Table.Th>Stock</Table.Th> */}
              <Table.Th>Status</Table.Th>
              <Table.Th>Action</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
        <Divider />
        <Group justify="center" align="center" p={10}>
          <Pagination
            total={data?.length}
            value={activePage}
            onChange={setPage}
            mt="sm"
          />
        </Group>
      </Box>

      <Modal opened={deleteModel} onClose={deleteModelClose}>
        {/* <Center>
          <CgDanger size={25} color="red" />
        </Center> */}
        <Text mt={10} fw={600} ta="center">
          Are you sure you want to delete?
        </Text>
        <Text mt={10} maw={400} ta="center" size="sm">
          The action of deletion cannot be undone. Are you sure you want to
          proceed delete to these item?
        </Text>
        <Group mt={20} justify="center">
          <Button variant="default" onClick={() => close()}>
            Cancel
          </Button>
          <Button
            // loading={isPending}
            onClick={handleDeleteBulk}
            color="red"
          >
            Delete
          </Button>
        </Group>
      </Modal>

      <Modal opened={updateModel} onClose={updateModelClose}>
        {/* <Center>
          <CgDanger size={25} color="red" />
        </Center> */}
        <Text mt={10} fw={600} ta="center">
          Are you sure you want to update?
        </Text>
        <Text mt={10} maw={400} ta="center" size="sm">
          The action of update cannot be undone. Are you sure you want to
          proceed update to these item?
        </Text>
        <Group mt={20} justify="center">
          <Button variant="default" onClick={() => close()}>
            Cancel
          </Button>
          <Button
            // loading={isPending}
            onClick={handleUpdateBulk}
          >
            Update
          </Button>
        </Group>
      </Modal>


    </Paper>
  );
}

export default CategoryProduct;
