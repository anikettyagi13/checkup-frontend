import { Button, Grid, Typography } from '@material-ui/core'
import image from '../../assets/hospital_cover.jpg'
import Loading from '../../utils/Loading'
export default function CoverProfile({
  user,
  setUser,
  type,
  coverClick,
  previewCoverImage,
  fileUpload,
  coverPreview,
  coverUploaded,
  coverLoading,
}) {
  return (
    <>
      {type === 'edit' ? (
        <>
          {previewCoverImage || (user && user.user && user.user.cover) ? (
            <Grid container item xs={12} className="coverProfile">
              <img
                src={previewCoverImage ? coverPreview : user.user.cover}
                className="coverProfilePic"
                // style={{ objectFit: 'cover', width: '80%' }}
                alt="cover"
              ></img>
              {coverLoading ? (
                <div
                  className="coverProfilePic"
                  style={{ backgroundColor: '#0000009e' }}
                >
                  <Loading width="150" stroke="6" />
                </div>
              ) : null}
              {previewCoverImage && !coverUploaded ? (
                <Grid
                  container
                  item
                  style={{
                    zIndex: 1,
                    position: 'absolute',
                    marginRight: '50px',
                    marginTop: '75px',
                    right: '0px',
                    border: '1px solid black',
                    borderRadius: '5px',
                    backgroundColor: '#FFF',
                    width: '100px',
                    height: '30px',
                    padding: '5px',
                  }}
                  justify="center"
                  alignContent="center"
                >
                  <Grid item>
                    <Button
                      onClick={() => fileUpload('cover')}
                      style={{ color: 'black' }}
                    >
                      <Typography>UPLOAD</Typography>
                    </Button>
                  </Grid>
                </Grid>
              ) : null}
              {!coverLoading ? (
                <Grid
                  container
                  item
                  style={{
                    zIndex: 1,
                    borderRadius: '5px',
                    border: '1px solid black',
                    backgroundColor: '#FFF',
                    width: '100px',
                    height: '30px',
                    padding: '5px',
                    marginTop: '75px',
                    position: 'absolute',
                    left: '50px',
                  }}
                  justify="center"
                  alignContent="center"
                >
                  <Grid item>
                    <Button
                      onClick={() => coverClick()}
                      style={{ color: 'black' }}
                    >
                      <Typography>Edit</Typography>
                    </Button>
                  </Grid>
                </Grid>
              ) : null}
            </Grid>
          ) : (
            <Grid
              container
              item
              // xs={12}
              justify="center"
              alignContent="center"
              className="coverProfile"
              style={{
                backgroundColor: '#c3c3c3',
                width: '95%',
                display: 'grid',
                borderRadius: '20px',
                position: 'relative',
                margin: 'auto',
                marginTop: '75px !important',
              }}
            >
              <Grid
                item
                justify="center"
                style={{
                  margin: 'auto',
                  // backgroundColor: '#c3c3c3',
                  width: '95%',
                }}
              >
                <Button
                  style={{
                    margin: 'auto !important',
                    width: '95%',
                  }}
                  onClick={coverClick}
                >
                  <img
                    src="https://img.icons8.com/material-rounded/80/000000/upload--v1.png"
                    alt="profile"
                  />
                </Button>
              </Grid>
            </Grid>
          )}
        </>
      ) : (
        <>
          {user && user.user && user.user.cover ? (
            <Grid item xs={12} className="coverProfile">
              <img
                src={user.user.cover}
                className="coverProfilePic"
                alt="cover"
              ></img>
            </Grid>
          ) : (
            <Grid item xs={12} className="coverProfile">
              <img
                src={image}
                className="coverProfilePic"
                // style={{ objectFit: 'cover', width: '100%' }}
                alt="cover"
              ></img>
            </Grid>
          )}
        </>
      )}
    </>
  )
}
