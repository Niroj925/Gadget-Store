import {
  Box,
  Button,
  Flex,
  Group,
  Image,
  Menu,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import React, { useState } from "react";
import {
  IconSearch,
  IconBell,
  IconChevronDown,
  IconSettings,
  IconMessageCircle,
  IconPhoto,
  IconArrowsLeftRight,
  IconTrash,
  IconUser,
  IconLogout,
} from "@tabler/icons-react";

function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  return (
    <Flex justify={"flex-end"} p={15} gap={10} direction={"row"}>
      <Group h={35}>
        {searchOpen ? (
          <TextInput
            rightSection={
              <IconSearch onClick={() => setSearchOpen(!searchOpen)} />
            }
            radius={20}
            placeholder="Search Product..."
          ></TextInput>
        ) : (
          <IconSearch
            onClick={() => setSearchOpen(!searchOpen)}
            style={{ color: "grey" }}
            size={30}
          />
        )}
      </Group>
      <Group gap={0}>
        <IconBell size={30} color="grey" />
        <Flex
          bg={"red"}
          ml={-11}
          mt={-20}
          w={20}
          h={20}
          style={{ borderRadius: "50%" }}
          justify={"center"}
          align={"center"}
        >
          <Text c={"white"} mt={2}>
            3
          </Text>
        </Flex>
      </Group>
      <Group gap={5}>
        <Image
          src="/image/img.jpeg"
          w={35}
          h={35}
          style={{ borderRadius: "50%" }}
        />
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <Button variant="transparent" p={0} align="center" justify="center">
              <IconChevronDown size={30} color="grey" />
            </Button>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item leftSection={<IconUser size={20} />}>Profile</Menu.Item>
            <Menu.Item leftSection={<IconLogout size={20} />}>
              Log Out
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </Flex>
  );
}

export default Header;