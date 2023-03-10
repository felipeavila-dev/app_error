import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import { DrawerHeader } from "../DrawerHeader";

export function CustomDrowerContent(props: DrawerContentComponentProps) {
    return(
        <DrawerContentScrollView {...props}>
                <DrawerHeader />
                <DrawerItemList {...props} />

                {/* <DrawerItem label='Teste' onPress={() => {}} /> */}
        </DrawerContentScrollView>

    );
}