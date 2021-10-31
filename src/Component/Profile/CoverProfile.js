import { Button, Grid } from '@material-ui/core'
import image from '../../assets/hospital_cover.jpg'
export default function CoverProfile({
  user,
  setUser,
  type,
  coverClick,
  previewCoverImage,
  fileUpload,
  coverPreview,
  coverUploaded,
}) {
  return (
    <>
      {type === 'edit' ? (
        <>
          {previewCoverImage || (user && user.user && user.user.cover) ? (
            <Grid container item xs={12} className="coverProfile">
              <img
                src={previewCoverImage ? coverPreview : user.user.cover}
                className="coverProfile"
                style={{ objectFit: 'cover', width: '100%' }}
                alt="cover"
              ></img>
              {previewCoverImage && !coverUploaded ? (
                <Grid
                  container
                  item
                  style={{
                    // top: '-50px',
                    position: 'absolute',
                    right: '0px',
                    // left: '35px',
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
                      onClick={() => fileUpload('cover')}
                      style={{ color: 'white' }}
                    >
                      UPLOAD
                    </Button>
                  </Grid>
                </Grid>
              ) : null}

              <Grid
                container
                item
                style={{
                  position: 'absolute',
                  left: '0px',
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
                    onClick={() => coverClick()}
                    style={{ color: 'white' }}
                  >
                    Edit
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          ) : (
            <Grid
              container
              item
              xs={12}
              justify="center"
              alignContent="center"
              className="coverProfile"
              style={{ backgroundColor: 'c3c3c3' }}
            >
              <Grid
                item
                justify="center"
                style={{ margin: 'auto', backgroundColor: 'c3c3c3' }}
              >
                <Button
                  style={{ margin: 'auto !important' }}
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
                className="coverProfile"
                style={{ objectFit: 'cover', width: '100%' }}
                alt="cover"
              ></img>
            </Grid>
          ) : (
            <Grid item xs={12} className="coverProfile">
              <img
                src={image}
                className="coverProfile"
                style={{ objectFit: 'cover', width: '100%' }}
                alt="cover"
              ></img>
            </Grid>
          )}
        </>
      )}
    </>
  )
}
