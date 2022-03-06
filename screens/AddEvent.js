import {StyleSheet, View, ScrollView, TouchableOpacity, Image} from 'react-native';
import useThemedStyles from '../hooks/useThemedStyles';
import AddImageBtn from '../public/icons/add-image-btn.png'
import React, { useEffect, useState } from 'react';
import UploadPicturesBtn from '../public/icons/upload-btn.png'
import LocationIcon from '../public/icons/location.png'
import TextInput from '../components/TextInput'
import { launchImageLibrary } from 'react-native-image-picker';
import { TextArea, Badge, Text } from 'native-base';

const AddEvent = () => {

  const style = useThemedStyles(styles);
  const [selectedThemes, setSelectedThemes] = useState(['Deforestation', 'Pollution'])
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [__, setUpdate] = useState(true)
  const themes = [
    {
      color: 'green.300',
      name: 'Deforestation'
    },
    {
      color: 'blue.300',
      name: 'Pollution'
    },
    {
      color: 'yellow.300',
      name: 'Climate'
    },
    {
      color: 'red.300',
      name: 'Poverty'
    },
    {
      color: 'indigo.300',
      name: 'Education'
    },
    {
      color: 'orange.300',
      name: 'Hunger'
    },
    {
      color: 'lime.300',
      name: 'Energy'
    },    
    {
      color: 'fuchsia.300',
      name: 'Wildlife'
    },
  ]

  const selectThemeAction = (name) => {
    selectedThemes.push(name)
    setUpdate(!__)
  }

  const handleChoosePhoto = () => {
    launchImageLibrary({ includeBase64: true }, (response) => {
      if (response) {
        setCoverPhoto(response);
      }
    });
  };

  const unselectThemeAction = (name) => {
    const index = selectedThemes.indexOf(name)
    selectedThemes.splice(index, 1)
    setUpdate(!__)
  }

  return (
    <View>
      <ScrollView style={style.pageContainer}>
        <View style={style.addImageBtn}>
          <TouchableOpacity onPress={() => handleChoosePhoto()}>
            {coverPhoto?.assets[0]?.uri? (
              <Image source={{uri: `data:image/png;base64,${coverPhoto.assets[0].base64}`}} width={200} height={400}></Image>
            ) : (
              <Image source={AddImageBtn} width={100} />
            )}
          </TouchableOpacity>
        </View>
        <View style={style.formContainer}>
          <View style={style.nameInput} >
            <Text style={style.fieldText}>
              Name of the Event*
            </Text>
            <TextInput />
          </View>
          <View style={style.descriptionInput}>
            <Text style={style.fieldText}>
              Description*
            </Text>
            <TextArea borderColor='black' placeholder={'Description of the event'}/>
          </View>
          <View style={style.descriptionInput}>
            <Text style={style.fieldText}>
              Rules for the Event*
            </Text>
            <TextArea borderColor='black' placeholder={'Rules for the event.'}/>
          </View>
          <View style={style.uploadPictures}>
            <Text style={style.fieldText}>
              Upload Pictures:
            </Text>
            <TouchableOpacity>
              <Image source={UploadPicturesBtn} />
            </TouchableOpacity>
          </View>
          <View style={style.locationInput}>
            <TouchableOpacity style={style.locationIcon}>
              <Image source={LocationIcon} />
            </TouchableOpacity>
            <TextInput placeholder={'Enter the location'}/>
          </View>
          <View style={style.selectThemes}>
            <Text style={style.fieldText}>
              Select Event Theme(s):
            </Text>
            <View style={style.themesContainer}>
              {themes.map((item) => (
                <View style={style.themeBtn} key={item.name}>
                  {selectedThemes.length > 0 && selectedThemes.includes(item.name) ? (
                    <TouchableOpacity onPress={() => unselectThemeAction(item.name)}>
                      <Badge bg={item.color} style={style.badgeStyle} rounded="full" _text={{ fontSize: 15 }}>
                        <Text style={style.badgeText}>
                          {item.name}
                        </Text>
                      </Badge>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity onPress={() => selectThemeAction(item.name)}>
                      <Badge variant={'outline'} borderWidth={2} borderColor={item.color} style={style.badgeStyle} rounded="full" _text={{ fontSize: 15 }}>
                        <Text style={style.badgeText}>
                          {item.name}
                        </Text>
                      </Badge>
                    </TouchableOpacity>
                  )}
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default AddEvent;

const styles = theme => StyleSheet.create({
  pageContainer: {
    margin: '5%',
  },
  addImageBtn: {
    alignItems: 'center'
  },
  formContainer: {
    marginTop: '7%',
    marginLeft: '3%',
  },
  fieldText: {
    color: 'black',
    marginRight: '2%',
    fontSize: theme.typography.size.XS,
    fontFamily: 'Lora-Bold',
    marginBottom: '2%'
  },
  nameInput: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 210,
    height: 40
  },
  descriptionInput: {
    marginTop: 20,
    width: '96%'
  },
  uploadPictures: {
    marginTop: 10,
    flexDirection: 'row',
    marginBottom: 10
  },
  locationInput: {
    flexDirection: 'row',
    height: 30,
    alignItems: 'center',
    width: '90%'
  },
  locationIcon: {
    marginRight: 9
  },
  selectThemes: {
    marginTop: 30
  },
  themesContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center'
  },
  themeBtn: {
    marginEnd: 10,
    marginVertical: 4
  },
  badgeStyle: {
    alignItems: 'center',
    alignContent: 'center',
    height: 40
  },
  unselectedBadgeStyle: {
    alignItems: 'center',
    alignContent: 'center',
    height: 40,
  },
  badgeText: {
    color: 'black',
    marginTop: 5,
    marginLeft: 6,
    fontFamily: 'Lora-Bold',
    marginRight: 6,
  }

});
