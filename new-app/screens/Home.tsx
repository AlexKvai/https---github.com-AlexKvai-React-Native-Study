import React from 'react';
import axios from 'axios';
import {
   ActivityIndicator,
   Alert,
   FlatList,
   RefreshControl,
   StatusBar,
   TouchableOpacity,
   View,
} from 'react-native';
import { Post } from '../components/Post';
import Loading from './Loading';

export const HomeScreen = ({ navigation }: { navigation: any }) => {
   const [isLoading, setIsLoading] = React.useState(true);
   const [items, setItems] = React.useState([]);

   const fetchPosts = () => {
      setIsLoading(true);
      axios
         .get('https://63beaf5bf5cfc0949b5e2675.mockapi.io/Posts')
         .then(({ data }) => {
            setItems(data);
         })
         .catch((err) => {
            console.log(err);
            Alert.alert('Ошибка', 'Не удалось получить статьи');
         })
         .finally(() => {
            setIsLoading(false);
         });
   };

   React.useEffect(fetchPosts, []);

   interface IFlat {
      id: number;
      title: string;
      imageUrl: string;
      createdAt: string;
   }

   return (
      <View>
         {isLoading ? (
            <Loading />
         ) : (
            <FlatList
               refreshControl={
                  <RefreshControl
                     refreshing={isLoading}
                     onRefresh={fetchPosts}
                  />
               }
               data={items}
               renderItem={({ item }: { item: IFlat }) => (
                  <TouchableOpacity
                     onPress={() =>
                        navigation.navigate('FullPost', {
                           id: item.id,
                           title: item.title,
                        })
                     }
                  >
                     <Post
                        title={item.title}
                        imageUrl={item.imageUrl}
                        createdAt={item.createdAt}
                     />
                  </TouchableOpacity>
               )}
            />
         )}
      </View>
   );
};
