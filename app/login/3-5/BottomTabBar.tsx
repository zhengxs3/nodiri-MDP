import { usePathname, useRouter } from 'expo-router';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function BottomTabBar() {
  const router = useRouter();
  const pathname = usePathname();

  // 每个 tab 的信息（路径、默认图、选中图）
  const tabs = [
    {
      path: '/login/3-5/routine',
      iconDefault: require('@/assets/images/img0routine0.png'),
      iconActive: require('@/assets/images/img0routine1.png'),
    },
    {
      path: '/login/3-5/boiteOutils',
      iconDefault: require('@/assets/images/img0boiteOutils0.png'),
      iconActive: require('@/assets/images/img0boiteOutils1.png'),
    },
    {
      path: '/login/3-5/accueil',
      iconDefault: require('@/assets/images/img0accueil0.png'),
      iconActive: require('@/assets/images/img0accueil1.png'),
    },
    {
      path: '/login/3-5/apprentissage',
      iconDefault: require('@/assets/images/img0apprentissage0.png'),
      iconActive: require('@/assets/images/img0apprentissage1.png'),
    },
    {
      path: '/login/codeparental',
      iconDefault: require('@/assets/images/img0messages0.png'),
      iconActive: require('@/assets/images/img0messages1.png'),
    },
  ];

  return (
    <View style={styles.tabBar}>
      {tabs.map((tab, index) => {
        const isActive = pathname === tab.path;
        return (
          <TouchableOpacity key={index} onPress={() => router.push(tab.path)}>
            <Image
              source={isActive ? tab.iconActive : tab.iconDefault}
              style={styles.tabIcon}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#2F7C8D',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  tabIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
});
