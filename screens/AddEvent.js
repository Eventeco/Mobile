import {StyleSheet, View, ScrollView, TouchableOpacity, Image} from 'react-native';
import useThemedStyles from '../hooks/useThemedStyles';
import AddImageBtn from '../public/icons/add-image-btn.png'
import React, { useEffect, useState } from 'react';
import UploadPicturesBtn from '../public/icons/upload-btn.png'
import LocationIcon from '../public/icons/location.png'
import TextInput from '../components/TextInput'
import { launchImageLibrary } from 'react-native-image-picker';
import { TextArea, Badge, Text } from 'native-base';
import TrashCan from '../public/icons/trash-can-solid.png'
import Alert from '../components/Alert';
import Button from '../components/Button';

const AddEvent = () => {

  const style = useThemedStyles(styles);
  const [eventName, setEventName] = useState(null)
  const [eventDescription, setEventDescription] = useState(null)
  const [rules, setRules] = useState(null)
  const [selectedThemes, setSelectedThemes] = useState(['Deforestation', 'Pollution'])
  
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [eventPhotos, setEventPhotos] = useState([]);
  const [imageSizeDialog, setImageSizeDialog] = useState(false)
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

  const handleChooseCoverPhoto = () => {
    launchImageLibrary({ includeBase64: true, mediaType: 'photo',  }, (response) => {
      console.log(response)
      if (!response.didCancel) {
        if (response?.assets[0]?.fileSize < 5200000) {
          setCoverPhoto(response);
        } else {
          setImageSizeDialog(true)
        }
      }
    });
  };

  const uploadPictures = () => {
    launchImageLibrary({ includeBase64: true, mediaType: 'photo',  }, (response) => {
      if (!response.didCancel) {
        if (response?.assets[0]?.fileSize < 5200000) {
          eventPhotos.push(response);
          setUpdate(!__)
        } else {
          setImageSizeDialog(true)
        }
      }
    });
  }

  const deleteEventPhoto = (index) => {
    eventPhotos.splice(index, 1)
    setUpdate(!__)
  }

  const unselectThemeAction = (name) => {
    const index = selectedThemes.indexOf(name)
    selectedThemes.splice(index, 1)
    setUpdate(!__)
  }
  return (
    <View>
      <ScrollView style={style.pageContainer}>
        <View style={style.addImageBtn}>
          <TouchableOpacity onPress={() => handleChooseCoverPhoto()}>
            {coverPhoto?.assets[0]?.uri? (
              <Image source={{uri: coverPhoto.assets[0].uri}} style={{ width: 400, height: 200}}></Image>
            ) : (
              <Image source={AddImageBtn} width={100} />
            )}
          </TouchableOpacity>
          <Alert alertTitle={'Image File Size Exceeded'} alertText={'You cannot upload images with file size greater than 5MBs'} onClose={() => {setImageSizeDialog(false)}} isOpen={imageSizeDialog} />
        </View>
        <View style={style.formContainer}>
          <View style={style.nameInput} >
            <Text style={style.fieldText}>
              Name of the Event*
            </Text>
            <TextInput value={eventName} onChangeText={(e) => setEventName(e)} />
          </View>
          <View style={style.descriptionInput}>
            <Text style={style.fieldText}>
              Description*
            </Text>
            <TextArea value={eventDescription} onChangeText={(e) => setEventDescription(e)} borderColor='black' placeholder={'Description of the event'}/>
          </View>
          <View style={style.descriptionInput}>
            <Text style={style.fieldText}>
              Rules for the Event*
            </Text>
            <TextArea value={rules} onChangeText={(e) => setRules(e)} borderColor='black' placeholder={'Rules for the event.'}/>
          </View>
          <View style={style.uploadPictures}>
            <Text style={style.fieldText}>
              Upload Pictures:
            </Text>
            <TouchableOpacity onPress={() => uploadPictures()}>
              <Image source={UploadPicturesBtn} />
            </TouchableOpacity>
          </View>
          {eventPhotos.map((item, index) => (
            <View style={style.uploadedImage}>
              <Image source={{ uri: item.assets[0].uri }} style={{ width: 80, height: 80, borderRadius: 10}} /> 
              <TouchableOpacity onPress={() => deleteEventPhoto(index)}>
                <Image source={TrashCan} resizeMode="cover" width={10} height={10} />
              </TouchableOpacity>
            </View>
          ))}
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
            <View style={style.createBtn}>
              <Button
                styleForButtonContainer={style.btnContainer}
                styleForButton={style.btn}
                title="CREATE EVENT"
              />
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
    justifyContent: 'center',
    marginBottom: 30
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
  },
  uploadedImage: {
    paddingVertical: 5,
    flex: 1,
    justifyContent: 'space-between',
    marginRight: 10,
    alignContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  createBtn: {
    marginBottom: 20,
    marginLeft: -10,
  },
  btnContainer: {
    backgroundColor: theme.colors.GREEN_400,
    width: '80%',
    borderRadius: 10,
    alignSelf: 'center',
    paddingVertical: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  btn: {
    color: 'white',
    fontSize: theme.typography.size.L,
    fontFamily: 'Lora-Regular',
  },


});
