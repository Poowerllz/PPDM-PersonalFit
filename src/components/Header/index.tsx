import { Box, Text, HStack, Image, useTheme, Stack } from "native-base";
import React from "react";
/* import { TouchableOpacity } from "react-native-gesture-handler"; */
import { ImageStyle } from "react-native/types";
import Navigation from "../../services/navigation";
import Icon from "../base/Icon";
import { Props } from "./types";
import Routes from "../../routes/paths";

const Header: React.FC<Props> = ({
  hideBack,
  hideConfig,
  title,
  background,
}) => {
  /*   const currentLanguage = i18n.languages[0]; */
  const theme = useTheme();

  return (
    <Stack
      safeAreaTop
      {...(background && { background: background })}
      p={"16px"}
      px={"16px"}
      borderBottomWidth={"1px"}
      borderBottomColor={"#E0E0E0"}
    >
      <HStack
        w={"100%"}
        alignItems={"center"}
        justifyContent={"center"}
        position={"relative"}
      >
        {!hideBack && (
          <Box position={"absolute"} left={0}>
            {/*         <TouchableOpacity onPress={() => Navigation.goBack()}> */}
            <Icon name={"angle-left"} color={theme.colors.primary[200]} />
            {/*      </TouchableOpacity> */}
          </Box>
        )}

        {title && (
          <Text color={"primary.300"} fontSize={"TMD"} fontWeight={700}>
            {title}
          </Text>
        )}
      </HStack>
    </Stack>
  );
};

export default Header;
