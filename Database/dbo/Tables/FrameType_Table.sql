CREATE TABLE [dbo].[FrameType_Table] (
    [ID_FrameType] INT            IDENTITY (1, 1) NOT NULL,
    [FrameType]    NVARCHAR (150) NULL,
    CONSTRAINT [PK_FrameType_Table] PRIMARY KEY CLUSTERED ([ID_FrameType] ASC)
);

