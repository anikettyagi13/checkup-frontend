import { Button, Grid } from '@material-ui/core'
import Loading from '../../utils/Loading'

export default function ProfilePic({
  previewImage,
  user,
  profilePreview,
  fileUpload,
  profileClick,
  type,
  profileLoading,
  profileUploaded,
}) {
  return (
    <>
      {type !== 'edit' ? (
        <Grid
          container
          item
          className="profilePicContainer"
          justify="center"
          alignContent="center"
        >
          {user && user.user && user.user.profile ? (
            <Grid container item justify="center" alignContent="center">
              <Grid item className="profilePic">
                <img
                  src={user.user.profile}
                  className="profilePicSettings"
                  alt="profile"
                ></img>
              </Grid>
            </Grid>
          ) : (
            <Grid container item className="profilePic">
              <div style={{ margin: 'auto' }}>
                <img
                  src="https://img.icons8.com/ios/50/000000/administrator-male--v1.png"
                  alt="profile"
                />
              </div>
            </Grid>
          )}
        </Grid>
      ) : (
        <Grid
          container
          item
          className="profilePicContainer"
          justify="center"
          alignContent="center"
        >
          {previewImage || (user && user.user && user.user.profile) ? (
            <Grid container item justify="center" alignContent="center">
              <Grid item className="profilePic">
                <img
                  src={previewImage ? profilePreview : user.user.profile}
                  className="profilePicSettings"
                  alt="profile"
                ></img>
                {profileLoading ? (
                  <div
                    className="profilePicSettings"
                    style={{
                      backgroundColor: '#0000009e',
                      position: 'absolute',
                      marginTop: '-124px',
                    }}
                  >
                    <Loading width="150" stroke="6" />
                  </div>
                ) : null}
                <Grid
                  item
                  style={{
                    position: 'relative',
                    top: '-150px',
                    left: '120px',
                  }}
                >
                  {!profileLoading ? (
                    <div
                      style={{
                        padding: '10px',
                        backgroundColor: '#FDFCDC',
                        borderRadius: '20px',
                        width: '10px',
                        height: '10px',
                        display: 'grid',
                        justify: 'center',
                        alignContent: 'center',
                      }}
                      onClick={profileClick}
                    >
                      <img
                        style={{
                          marginTop: '2px',
                          marginLeft: '-1px',
                        }}
                        src="https://img.icons8.com/material-rounded/12/000000/edit--v2.png"
                        alt="profile"
                      />
                    </div>
                  ) : null}
                </Grid>
                {previewImage && !profileUploaded ? (
                  <Grid
                    container
                    item
                    style={{
                      top: '-50px',
                      position: 'relative',
                      left: '35px',
                      borderBottomRightRadius: '5px',
                      backgroundColor: '#00000070',
                      width: '100px',
                      height: '30px',
                      padding: '5px',
                    }}
                    justify="center"
                    alignContent="center"
                  >
                    <Grid item>
                      <Button
                        onClick={() => fileUpload('profile')}
                        style={{ color: 'white' }}
                      >
                        UPLOAD
                      </Button>
                    </Grid>
                  </Grid>
                ) : null}
              </Grid>
            </Grid>
          ) : (
            <Grid container item className="profilePic">
              <Button style={{ margin: 'auto' }} onClick={profileClick}>
                <img
                  src="https://img.icons8.com/material-rounded/50/000000/upload--v1.png"
                  alt="profile"
                />
              </Button>
            </Grid>
          )}
        </Grid>
      )}
    </>
  )
}
